import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000",
	}),
	tagTypes: ["Videos"],
	endpoints: (builder) => ({
		getVideos: builder.query({
			query: () => "/videos",
			keepUnusedDataFor: 600,
			providesTags: ["Videos"],
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
		addVideo: builder.mutation({
			query: (data) => ({
				url: "/videos",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Videos"],
		}),
		editVideo: builder.mutation({
			query: ({ data, id }) => ({
				url: `/videos/${id}`,
				method: "PATCH",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetVideosQuery,
	useGetSingleVideoQuery,
	useGetRelatedVideosQuery,
	useAddVideoMutation,
	useEditVideoMutation,
} = apiSlice;
