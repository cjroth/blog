import { Feed } from "feed";
import { source } from "@/lib/source";

export const dynamic = "force-static";

const baseUrl = new URL("https://cjroth.com");

export function GET() {
	const feed = new Feed({
		title: "Chris Roth",
		description: "AI Engineering, Product, & Design",
		id: baseUrl.href,
		language: "en",
		copyright: `All rights reserved ${new Date().getFullYear()}, Chris Roth`,
		favicon: new URL("/favicon.ico", baseUrl).href,
		link: baseUrl.href,
		feed: new URL("/feed.xml", baseUrl).href,
		updated: new Date(),
	});

	const posts = source
		.getPages()
		.filter((page) => page.url !== "/blog")
		.sort((a, b) => {
			const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
			const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
			return dateB - dateA;
		});

	for (const post of posts) {
		feed.addItem({
			title: post.data.title,
			description: post.data.description ?? "",
			link: new URL(post.url, baseUrl).href,
			date: post.data.date ? new Date(post.data.date) : new Date(),
			author: [{ name: post.data.author ?? "Chris Roth" }],
		});
	}

	return new Response(feed.atom1(), {
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
