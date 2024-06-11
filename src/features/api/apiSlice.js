import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000",
	}),
	endpoints: (builder) => ({
		getVideos: builder.query({
			query: () => "/videos",
		}),
		getSingleVideo: builder.query({
			query: (videoId) => `/videos/${videoId}`,
		}),
		getRelatedVideos: builder.query({
			query: ({ id, title }) => {
				const tags = title.split(" ");
				const searchString = tags.map((tag) => `title_like=${tag}`);
				const queryString = `/videos/?${searchString.join("&")}&_limit=4`;
				return queryString;
			},
		}),
	}),
});

export const { useGetVideosQuery, useGetSingleVideoQuery, useGetRelatedVideosQuery } = apiSlice;
