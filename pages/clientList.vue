<script setup>
import { collection, query, where } from 'firebase/firestore'

const db = useFirestore()
const clientsRef = collection(db, 'clients')
//const isClient = ref(true)
//const q = query(clientsRef, where("client", "==", isClient.value))
const {
    data: clients,
    pending,
    error,
    promise,
} = useCollection(clientsRef)


</script>


<template>
    <section class="pt-5 pl-10">

        <UContainer>
            <UCard>
                <template #header><h1 class="text-3xl pb-2">Clients List</h1></template>
                <div v-if="pending"> Data Loading</div>
        <div class="pb-4  gap-3" v-for="client in clients" :key="client.id">
           <div class="flex items-center p-4 "> <Icon name="uil:briefcase"/><p class="text-xl font-semibold pl-4 "> {{ client.name }}</p></div>
            <div class="flex gap-4 pb-2">

            <UButton 
            :to="`/clients/${client.id}`"
            variant="soft"
            label="view shipments"
            >
            <template #trailing>
    <UIcon name="i-heroicons-arrow-up-right-20-solid" />
  </template>
            </UButton>
            <UButton :to="`/clients/reports-${client.id}`" 
            variant="ghost"
            label="view reports">
            <template #trailing>
    <UIcon name="i-heroicons-arrow-up-right-20-solid" />
  </template>
                
            </UButton></div>
            <UDivider></UDivider>
            
        </div> 
            </UCard>
        
        
    </UContainer> 

        <template>
 
</template>
        

    </section>
    
</template>



<style  scoped>

</style>