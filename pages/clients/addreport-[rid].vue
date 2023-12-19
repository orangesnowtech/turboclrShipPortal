<script setup>
const { files, open, reset } = useFileDialog({})
import { useRouteParams } from '@vueuse/router'
import { ref as storageRef } from 'firebase/storage'
const storage = useFirebaseStorage()
const clientId = useRouteParams('rid')
const docName = ref('')
const uploadPath = ref('myclients/'+clientId.value)
const uploadRef = storageRef(storage, uploadPath.value)
const {
    theurl,
  // gives you a percentage between 0 and 1 of the upload progress
  uploadProgress,
  uploadError,
  // firebase upload task
  uploadTask,
  upload,
} = useStorageFile(uploadRef)

function uploadPicture() {
 docName.value = files.value.item(0).name
  const data = files.value.item(0)
  if (data) {
    upload(data)
  }
}

const uploadPercent = computed(() => Math.round(uploadProgress * 100), {
  watch: uploadProgress,
});
</script>



<template>
    <section class="pt-5 pl-10">
        <h1 class="text-3xl pb-5">Add report here</h1>
        <form @submit.prevent="uploadPicture">
        <fieldset :disabled="!!uploadTask">
        <button
        type="button"
        @click="open({ multiple: false })"
       >
      <template v-if="files?.length === 1">
          Selected file: {{ files.item(0).name }} (Click to select another)
        </template>
        <template v-else> Select Document </template>
      </button>
      <br/>
      <button class="btn-primary">Upload</button>
      <p>This is the{{ theurl }}</p>
    </fieldset>
</form>
    <p>The percent is:{{ uploadPercent }}</p>
    <p>THe progress is:{{ uploadProgress }}</p>
    </section>
</template>


<style lang="scss" scoped>

</style>