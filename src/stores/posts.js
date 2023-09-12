import { defineStore } from "pinia";

export const usePostStore = defineStore("posts", {
  state: () => ({
    user: Math.floor(Math.random() * 10) + 1,
    posts: [],
    currentPage: 1,
    pageSize: 10,
    selectedPost: null,
  }),

  actions: {
    addPost(newPost) {
      this.posts = [newPost, ...this.posts];
    },

    updatePost(updatedPost) {
      const index = this.posts.findIndex((post) => post.id === updatedPost.id);
      this.posts[index] = updatedPost;
    },

    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
    },

    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    setSelectedPost(editPost) {
      this.selectedPost = editPost;
    },
  },
});
