<script setup>
import {collection, doc } from 'firebase/firestore'

const db = useFirestore()
// get the route to be able to access the params
const route = useRoute()
const clientId = route.params.id
const clientDocRef = doc(db,'clients', clientId)
const {
    data: clientDoc, 
    
} = useDocument(clientDocRef)
const reportsUrl = 'clients/'+clientId+'/clientReports'
const reportsRef = collection(db,reportsUrl)
const {
    data: reports,
    pending,
    error,
    promise,
}  = useCollection(reportsRef)




</script>

<template>
    <section class="pt-8 pl-10">
      <NuxtLink :to="`./addreport-${clientId}`" class="btn-primary"> Add Report </NuxtLink><NuxtLink class="pl-4" to="/clientList">Go Back</NuxtLink>  
    <div>
       <div><p class="text-3xl items-stretch pt-8 pb-4">The {{ clientDoc.name}} Reports List</p> </div> 
        <div v-if="pending">Data loading...</div>
        <div class="pb-4" v-for="report in reports" :key="report.id"><p  class="cursor-pointer">{{ report.name }}<Icon name="uil:arrow-up-right"/></p></div>
        
    </div>
</section>
</template>



<style scoped>

</style>