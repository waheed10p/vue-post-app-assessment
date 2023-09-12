<script>
import { computed, onMounted, ref } from "vue";
import { usePostStore } from "@/stores/posts.js";
import { getPosts } from "@/services/postService";

export default {
  setup() {
    const postStore = usePostStore();
    const isFiltered = ref(false);
    onMounted(async () => {
      try {
        const posts = await getPosts();
        postStore.posts = posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    });
    const paginatedPosts = computed(() => {
      if (isFiltered.value) {
        return postStore.posts.filter((post) => post.userId === postStore.user);
      }
      const start = (postStore.currentPage - 1) * postStore.pageSize;
      const end = start + postStore.pageSize;
      return postStore.posts.slice(0, end);
    });
    const filterButtonText = computed(() =>
      isFiltered.value ? "Show All Posts" : "Show My Post"
    );

    function toggleFiltter() {
      isFiltered.value = !isFiltered.value;
    }

    function deletePost(postId) {
      postStore.deletePost(postId);
    }

    function editPost(post) {
      document.getElementById("title").focus();
      postStore.setSelectedPost(post);
    }

    function loadNextPage() {
      postStore.setCurrentPage(postStore.currentPage + 1);
    }

    const hasMorePosts = computed(() => {
      return (
        postStore.currentPage * postStore.pageSize < postStore.posts.length
      );
    });

    return {
      paginatedPosts,
      deletePost,
      editPost,
      loadNextPage,
      hasMorePosts,
      filterButtonText,
      toggleFiltter,
    };
  },
};
</script>

<template>
  <div>
    <button class="filterButton" @click="toggleFiltter">
      {{ filterButtonText }}
    </button>
    <div v-for="post in paginatedPosts" :key="post.id" class="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <button @click="deletePost(post.id)">Delete</button>
      <button @click="editPost(post)">Edit</button>
    </div>

    <button class="nextPageButton" v-if="hasMorePosts" @click="loadNextPage">
      Next Page
    </button>
  </div>
</template>

<style scoped>
.post {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
}
.filterButton {
  margin-bottom: 1rem;
  margin-top: 3rem;
  padding: 0.5rem;
}

button {
  margin-right: 0.5rem;
  margin-top: 2rem;
}
.nextPageButton {
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 3rem;
}
</style>
