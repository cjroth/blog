'use client'

import { useState, useEffect, useMemo } from 'react'
import { Box, Text } from 'ink'
import { InkTerminalBox } from 'ink-web'
import 'ink-web/css'
import 'xterm/css/xterm.css'
import {
  Wizard,
  OpfsStorageAdapter,
  readWizardStateAsync,
  loadPortfolioAsync,
  loadPortfolioDataAsync,
} from '@cjroth/rebalance'
import type { RebalanceInput, Symbol, Account, Holding } from '@cjroth/rebalance'

interface InitState {
  initialStep: number
  portfolio: RebalanceInput | null
  portfolioData: { symbols: Symbol[]; accounts: Account[]; holdings: Holding[] } | null
}

function WebWizard() {
  const storage = useMemo(() => new OpfsStorageAdapter(), [])
  const [init, setInit] = useState<InitState | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const state = await readWizardStateAsync(storage)
        const portfolio = await loadPortfolioAsync(storage)
        let portfolioData: InitState['portfolioData'] = null
        if (portfolio) {
          portfolioData = await loadPortfolioDataAsync(storage)
        }
        setInit({ initialStep: state.currentStep, portfolio, portfolioData })
      } catch {
        setInit({ initialStep: 1, portfolio: null, portfolioData: null })
      }
    }
    load()
  }, [storage])

  if (!init) {
    return (
      <Box paddingX={1}>
        <Text dimColor>Loading...</Text>
      </Box>
    )
  }

  return (
    <Wizard
      storage={storage}
      initialStep={init.initialStep}
      preloadedPortfolio={init.portfolio}
      preloadedData={init.portfolioData}
    />
  )
}

export function RebalancerTerminal({ onReady }: { onReady?: () => void }) {
  return (
    <InkTerminalBox rows={30} focus onReady={onReady}>
      <WebWizard />
    </InkTerminalBox>
  )
}
