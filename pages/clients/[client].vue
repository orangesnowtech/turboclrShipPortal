<script setup>
import {collection, doc } from 'firebase/firestore'

const db = useFirestore()
// get the route to be able to access the params
const route = useRoute()
const clientId = route.params.client

const clientDocRef = computed(() =>
doc(db,'clients', clientId)
)

const {
    data: clientDoc, pending: isPending
    
} = useDocument(clientDocRef)


const shipmentUrl = 'clients/'+clientId+'/clientShipments'
const shipmentRef = shallowRef(collection(db,shipmentUrl))
const {
    data: shipments,
    pending,
    error,
    promise,
}  = useCollection(shipmentRef)

const clientName = ref('Client Name')


const searchQuery = ref('')

const shipmentNo = computed(() =>{
    if(!shipments){
        return 0
    } 
    return shipments.value.length
})

const filteredShipments = computed(() => {
    if(!searchQuery.value){
        return shipments.value
    }
    return shipments.value.filter((shipment) =>{
        return Object.values(shipment).some((value) =>{
            return String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
        })
    })

})


const items = (row) => [
  [
    {
        label: 'View Shipment',
        icon: 'i-heroicons-magnifying-glass'
    }
  ],
  [{
    label: 'Edit Shipment',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Edit Bill',
    icon: 'i-heroicons-banknotes-20-solid'
  },
{
    label: 'Add Documents',
    icon: 'i-heroicons-document-duplicate-20-solid'
},


], [{
    label: 'Delete Shipment',
    icon: 'i-heroicons-trash-20-solid'
  }]
]



//pagination 
const page = ref(1)
const pageCount = ref(10)
const pageCountOption = [10, 25, 50, 100]

const paginatedData = computed(() => {
    return filteredShipments.value.slice((page.value -1) * pageCount.value, (page.value) * pageCount.value)
})

//data columns
const columns = [
{
        key: 'date',
        label: 'Date',
        sortable: true
    },
{
    key: 'transNo',
    label: 'Transaction Number',
    sortable: true
},
{
    key: 'cargoNo',
    label: 'Cargo Control Number',
    sortable: true
},
{
    key: 'shipmntType',
    label: 'Shipment Type',
    sortable: true
},
{
    key: 'originCountry',
    label: 'Country of Origin',
    sortable: true
},
{
    key: 'shpmntValue',
    label: 'Value',
    sortable: true
},
{
    key: 'published',
    label: 'Published',
    sortable: true
},
{
    key: 'actions'
}

]
const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))
const selected = ref([shipments[1]])

</script>

<template>
<section class="pt-8 gap-2 pl-10">
    <NuxtLink class="pl-4" to="/clientList">Go Back</NuxtLink> 
            
    <div class="flex gap-4 items-center"><p class="text-3xl pt-8 pb-4">{{ isPending ? clientName : clientDoc.name }} Shipment List</p> </div>
    <p class="text-sm">Total Shipments:  {{ shipmentNo }}</p> 
       
       <div class="flex items-center gap-4 pt-4 pb-4">
        
        <UButton :to="`/clients/addShipment-${clientId}`" color="black" >Add Shipment</UButton>
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton
            icon="i-heroicons-view-columns"
            color="gray"
            size="xs"
          >
            Select Columns
          </UButton>
        </USelectMenu>
        <USelectMenu v-model="pageCount" :options="pageCountOption">
            <UButton
            icon="i-heroicons-bars-3"
            color="gray"
            size="xs"
          >
            rows per page
          </UButton>
        </USelectMenu>
        <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
        <UPagination v-model="page" :page-count="pageCount" :total="shipments.length" />
  
        </div>
        <UDivider/>
       <UTable
       class="pb-10"
           v-model="selected"
           :loading="pending"
           :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No Shipments.' }"
           :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading Shipments...' }" 
           :columns="columnsTable" 
           :rows="paginatedData">
        <template #date-data="{ row }">
           {{row.date.toDate().toDateString() }}
        </template>
        <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
        
        
        </UTable>
       
   
    

    
  
    
</section>
</template>



<style scoped>

</style>