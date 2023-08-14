<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

watchEffect(() => {
  if (user.value) {
    navigateTo('/visits')
  }
})

async function signInWithGitHub() {
  const { data, error } = await auth.signInWithOAuth({
    provider: 'github',
  })
}
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
      Sign in to your account
    </h2>
    <LoginCard>
      <button
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Github"
        variant="black"
        @click="signInWithGitHub"
      >login</button>
    </LoginCard>
  </div>
</template>
