import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  articles: [],
  filteredArticles: [],
  error: "",
};
export const fetchArticles = createAsyncThunk("/articles", (token) => {
  if (!token) {
    token = "";
  }
  const config = { headers: { Authorization: `Token ${token}` } };
  return axios
    .get("https://api.realworld.io/api/articles", config)
    .then((response) => response);
});

export const fetchArticleBySlug = createAsyncThunk(
  "article/slug",
  ({ token, slug }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Token ${token ? token : ""}` },
    };
    return axios
      .get(`https://api.realworld.io/api/articles/${slug}`, config)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const createArticle = createAsyncThunk(
  "/articles/create",
  ({ token, article }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Token ${token ? token : ""}` },
    };
    return axios
      .post("https://api.realworld.io/api/articles", { article }, config)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteArticle = createAsyncThunk(
  "/article/slug/delete",
  ({ token, slug }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Token ${token ? token : ""}` },
    };
    return axios
      .delete(`https://api.realworld.io/api/articles/${slug}`, config)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const favoriteArticle = createAsyncThunk(
  "articles/slug/favorite",
  (favoriteObj, { rejectWithValue }) => {
    const { token, slug } = favoriteObj;
    const config = { headers: { Authorization: `Token ${token}` } };
    return axios
      .post(
        `https://api.realworld.io/api/articles/${slug}/favorite`,
        {},
        config
      )
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const unFavoriteArticle = createAsyncThunk(
  "articles/slug/unfavorite",
  (favoriteObj, { rejectWithValue }) => {
    const { token, slug } = favoriteObj;
    const config = { headers: { Authorization: `Token ${token}` } };
    return axios
      .delete(`https://api.realworld.io/api/articles/${slug}/favorite`, config)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const fetchComments = createAsyncThunk(
  "articles/slug/getcomments",
  ({ token, slug }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Token ${token ? token : ""}` },
    };
    return axios
      .get(`https://api.realworld.io/api/articles/${slug}/comments`, config)
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const createComment = createAsyncThunk(
  "articles/slug/comments",
  ({ token, comment, slug }, { rejectWithValue }) => {
    const config = { headers: { Authorization: `Token ${token}` } };
    const body = { comment: { body: comment } };
    return axios
      .post(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        body,
        config
      )
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const deleteComment = createAsyncThunk(
  "articles/slug/deletecomments",
  ({ token, slug, id }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Token ${token ? token : ""}` },
    };
    return axios
      .delete(
        `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
        config
      )
      .then((res) => res)
      .catch((err) => rejectWithValue(err));
  }
);

export const getTags = createAsyncThunk("tags", (token, { rejectWithValue }) => {
  const config = {
    headers: { Authorization: `Token ${token ? token : ""}` },
  };
  return axios
    .get("https://api.realworld.io/api/tags", config)
    .then((res) => res)
    .catch((err) => rejectWithValue(err));
});

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filteredArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch all articles
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.data.articles;
      state.filteredArticles = action.payload.data.articles;
      state.error = "";
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.articles = [];
      state.error = action.error;
    });
    // add favorited an article
    builder.addCase(favoriteArticle.pending, (state) => {
      state.favoriteLoading = true;
    });
    builder.addCase(favoriteArticle.fulfilled, (state, action) => {
      state.favoriteLoading = false;
      state.FavoriteError = "";
    });
    builder.addCase(favoriteArticle.rejected, (state, action) => {
      state.favoriteLoading = false;
      console.log(action);
      state.FavoriteError = "";
    });

    //unfavorite an article
    builder.addCase(unFavoriteArticle.pending, (state) => {
      state.unfavoriteLoading = true;
    });
    builder.addCase(unFavoriteArticle.fulfilled, (state, action) => {
      state.unfavoriteLoading = false;
      state.unFavoriteError = "";
    });
    builder.addCase(unFavoriteArticle.rejected, (state, action) => {
      state.unfavoriteLoading = false;
      state.unFavoriteError = "";
    });

    //get an article by slug
    builder.addCase(fetchArticleBySlug.pending, (state) => {
      state.articleBySlugLoading = true;
    });
    builder.addCase(fetchArticleBySlug.fulfilled, (state, action) => {
      state.articleBySlugLoading = false;
      state.articleBySlugError = "";
      state.articleBySlugData = action.payload.data.article;
    });
    builder.addCase(fetchArticleBySlug.rejected, (state, action) => {
      state.articleBySlugLoading = false;
      state.articleBySlugError = action.payload;
      state.articleBySlugData = {};
    });

    //create an comment
    builder.addCase(createComment.pending, (state) => {
      console.log("1");
      state.createCommentLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      console.log("2");

      state.createCommentLoading = false;
      state.createCommentError = {};
      state.createCommentData = action.payload;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      console.log("3");

      state.createCommentLoading = false;
      state.createCommentError = action.payload;
      state.createCommentData = {};
    });

    //fetch comment
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchCommentLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.fetchCommentLoading = false;
      state.fetchCommentData = action.payload.data.comments;
      state.fetchCommentError = "";
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.fetchCommentLoading = false;
      state.fetchCommentData = "";
      state.fetchCommentError = action.payload;
    });

    //delete comment
    builder.addCase(deleteComment.pending, (state) => {
      state.deleteCommentLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.deleteCommentLoading = false;
      state.deleteCommentData = action.payload;
      state.deleteCommentError = "";
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.deleteCommentLoading = false;
      state.deleteCommentData = "";
      state.deleteCommentError = action.payload;
    });

    //createArticle
    builder.addCase(createArticle.pending, (state) => {
      state.createArticleLoading = true;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.createArticleLoading = false;
      state.createArticleData = action.payload;
      state.createArticleError = "";
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.createArticleLoading = false;
      state.createArticleData = "";
      state.createArticleError = action.payload;
    });

    //delete article
    builder.addCase(deleteArticle.pending, (state) => {
      state.deleteArticleLoading = true;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.deleteArticleLoading = false;
      state.deleteArticleData = action.payload;
      state.deleteArticleError = "";
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.deleteArticleLoading = false;
      state.deleteArticleData = "";
      state.deleteArticleError = action.payload;
    });

    //get tags
    builder.addCase(getTags.pending, (state) => {
      state.getTagsLoading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.getTagsLoading = false;
      console.log(action.payload.data.tags)
      state.getTagsData = action.payload.data.tags;
      state.getTagsError = "";
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.getTagsLoading = false;
      state.getTagsData = "";
      state.getTagsError = action.payload;
    });
  },
});

export default articleSlice.reducer;
export const { filter } = articleSlice.actions;
