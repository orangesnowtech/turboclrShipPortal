<script setup>
import { collection, doc, addDoc, Timestamp, setDoc } from 'firebase/firestore';
import { useRouteParams } from '@vueuse/router'
const clientId = useRouteParams('cid')
const shipUploadPath = ref('myclients/'+clientId.value+'/clientShipments')
const shipBillUploadPath = ref('myclients/'+clientId.value+'/clientBillings')
const db = useFirestore()





async function addShipment(){ 
try {
    
    const billingRef = doc(collection(db,shipBillUploadPath.value))
    const shipmentREf = doc(collection(db,shipUploadPath.value))

    await setDoc(shipmentREf, {
    cargoNo : cargoNo.value,
    transNo: transNo.value,
    shipmentType: shipmentType.value,
    entryPort: entryPort.value,
    entryType: entryType.value,
    date: convertDate(shipmentDate.value),
    originCountry: originCountry.value,
    billings: billingRef
}).then(await setDoc(billingRef,{
        type: shipmentType.value,
        consistEntry : 0,
        entryBond : 0,
        disbFee : 0,
        HSCode1 : 0,
        HSCode2 : 0,
        docServ : 0,
        bondFee : 0,
        bolSubmit : 0,
        eCallOut : 0,
        viPermit : 0,
        piPermit : 0,
        ogd : 0,
        profServ : 0,
        sima : 0,
        gst : 0,
        exTax : 0,
        clrEntry : 0,
        shipPreFile : 0,
        usmaCert : 0,
        custExportDclrtn : 0,
        addLineCommInv : 0,
        commInv : 0,
        otherCharges : 0,
        certOrigin : 0,
        hst : 0,
        b3Form : 0,
        arClaim : 0,
        annualBondFee : 0,
        prepWayBill : 0,
        prepAirWayBill : 0,
        prepBillLading : 0,
        prepOceanWayBill : 0,
        drayage : 0,
        freightDoorDlvry : 0,
        ForwardBOL : 0,
        storeRailyard : 0,
        storeConWarehseFTL : 0,
        storeConWarehseLTL : 0,
        powerTailgate : 0,
        storeUSMCAcert : 0,
        commDoc : 0,
        freightDisbFee : 0,
        duty : 0,
        adminCharge : 0,
        demurrage : 0,
        shipmnt : shipmentREf

    })).then(toast.add({title: 'Shipment Added Successfully'})).then(resetForm())
    
} catch (error) {
    console.log(error)
}
    
}

function resetForm(){
    cargoNo.value = ''
    transNo.value = ''
    shipmentType.value = ''
    entryPort.value = ''
    originCountry.value = ''
    shipmentDate.value = ''
    entryType.value = ''
}


function convertDate (date){
    const parsedDate = new Date(date)
    return Timestamp.fromDate(parsedDate)
}

const cargoNo = ref('')
const transNo = ref('')
const shipmentTypeList = ref([
    'Import',
    'Import w/ Freight',
    'Export',
    'Export w/ Freight',
    'Freight'
])

const entryPort = ref('')
const entryTypeList = ref([
    10, 13, 20, 21, 22, 30, 'AB', 'C'
])
const shipmentType = ref('')
const entryType = ref('')


const { data: countryList } = await useFetch('https://firebasestorage.googleapis.com/v0/b/turboclr-e5281.appspot.com/o/countries.json?alt=media&token=5176b81e-6aaa-44c3-8715-754d0c4fcd58', )
   
const shipmentDate = ref()

const originCountry = ref('')

const billingData = {
        type: shipmentType.value,
        consistEntry : 0,
        entryBond : 0,
        disbFee : 0,
        HSCode1 : 0,
        HSCode2 : 0,
        docServ : 0,
        bondFee : 0,
        bolSubmit : 0,
        eCallOut : 0,
        viPermit : 0,
        piPermit : 0,
        ogd : 0,
        profServ : 0,
        sima : 0,
        gst : 0,
        exTax : 0,
        clrEntry : 0,
        shipPreFile : 0,
        usmaCert : 0,
        custExportDclrtn : 0,
        addLineCommInv : 0,
        commInv : 0,
        otherCharges : 0,
        certOrigin : 0,
        hst : 0,
        b3Form : 0,
        arClaim : 0,
        annualBondFee : 0,
        prepWayBill : 0,
        prepAirWayBill : 0,
        prepBillLading : 0,
        prepOceanWayBill : 0,
        drayage : 0,
        freightDoorDlvry : 0,
        ForwardBOL : 0,
        storeRailyard : 0,
        storeConWarehseFTL : 0,
        storeConWarehseLTL : 0,
        powerTailgate : 0,
        storeUSMCAcert : 0,
        commDoc : 0,
        freightDisbFee : 0,
        duty : 0,
        adminCharge : 0,
        demurrage : 0,
        shipmnt : ''

    }

const toast = useToast()
</script>
<template>
    <section class="w-auto p-4">
        <NuxtLink class="pl-4" to="/clientList">Go Back</NuxtLink> 

    <UCard class="w-fit">
        <h1 class="text-xl pl-10">Add Shipment</h1>
        <form class="p-10">
        <div class="pb-4">
        <label for="cargoNo">Cargo Number</label>
        <UInput name="cargoNo" v-model="cargoNo"/>
        </div>
        <div class="pb-4">
        <label for="transNo">Transaction Number</label>
        <UInput name="transNo" v-model="transNo"/>
        </div>

        <div class="pb-4">
        <label for="entryPort">Entry Port</label>
        <UInput name="entryPort" v-model="entryPort"/>
        </div>

        <div class="pb-4">
            <label for="shipmentType">Shipment Type</label>
            <USelect
           v-model="shipmentType"
            :options="shipmentTypeList" placeholder="select shipment type..."/>
        </div>

        <div class="pb-4">
            <label for="entryType">Entry Type</label>
            <USelect v-model="entryType" :options="entryTypeList" placeholder="select entry type..."/>
        </div>

        <div class="pb-4">
            
            <label for="countryList">Select Country of Origin</label>
            <USelectMenu
            :loading="!countryList"
            searchable
            searchable-placeholder="search countries..."
            icon="i-heroicons-magnifying-glass-20-solid"
            name="countryList" 
            v-model="originCountry" 
            :options="countryList" 
            option-attribute="name"
            value-attribute="name"
            clear-search-on-close
            placeholder="select country..."
            
            />
            </div>
        <div class="pb-4">
            <label for="shipmentDate">Shipment Date</label>
            <UInput name="shipmentDate" type="date" v-model="shipmentDate"/>

        </div>
        <UButton @click.prevent="addShipment" label="Add Shipment"/>
        
    </form>
    </UCard>
    <UNotifications/>
    </section>
    
    
</template>