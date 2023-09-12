<script>
import { computed, ref, watchEffect } from "vue";
import { usePostStore } from "@/stores/posts.js";

export default {
  setup() {
    const postStore = usePostStore();
    const title = ref("");
    const body = ref("");

    watchEffect(() => {
      const selectedPost = postStore.selectedPost;
      if (selectedPost) {
        title.value = selectedPost.title;
        body.value = selectedPost.body;
      }
    });

    const buttonText = computed(() => {
      return postStore.selectedPost ? "Update" : "Save";
    });

    function handleSubmit() {
      if (title.value.length < 5 || body.value.length < 10) {
        alert(
          "Title must be at least 5 characters and description must be at least 10 characters."
        );
        return;
      }

      if (postStore.selectedPost) {
        const updatedPost = {
          ...postStore.selectedPost,
          title: title.value,
          body: body.value,
        };

        postStore.updatePost(updatedPost);
        postStore.setSelectedPost(null);
      } else {
        const newPost = {
          title: title.value,
          body: body.value,
          userId: postStore.user,
          id: Math.floor(Math.random() * 200) + 100,
        };
        postStore.addPost(newPost);
      }

      // Reseting form after submission
      title.value = "";
      body.value = "";
    }

    return { title, body, handleSubmit, buttonText };
  },
};
</script>

<template>
  <form class="postForm" @submit.prevent="handleSubmit">
    <h2>What's on your mind ?</h2>
    <div>
      <input
        type="text"
        id="title"
        v-model="title"
        required
        pattern=".{5,}"
        title="Title must be at least 5 characters long"
        placeholder="Please add Post title"
      />
    </div>
    <div>
      <textarea
        id="body"
        v-model="body"
        required
        pattern=".{10,}"
        title="Description must be at least 10 characters long"
        placeholder="Please add Post Description"
      ></textarea>
    </div>
    <button type="submit">{{ buttonText }}</button>
  </form>
</template>

<style scoped>
.postForm {
  padding: 2rem;
  max-width: 500px;
}
.postForm h2 {
  margin: 1rem 0;
}
.postForm input,
textarea {
  height: 40px;
  width: 100%;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
}
.postForm textarea {
  height: 5rem;
}

.postForm button {
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  text-align: center;
}
</style>
