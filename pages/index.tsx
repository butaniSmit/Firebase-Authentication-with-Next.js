import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProtectedRoute from '@/components/common/protectedRoute'
import Layout from '@/components/common/layout/layout'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '@/config/firebase'

export default function Home() {
  const [uid,setUid] = useState<any>();
  const [data,setData]= useState<any>([]);
const fetchData = async()=>{
  const q = await query(collection(db, `Users/${localStorage.getItem("Token")}/reports`), orderBy("name"), limit(25));
  const querySnapshot = await getDocs(q);
  const fetchdata = querySnapshot.docs.map((doc)=>{
    return({
     data: doc.data(),
     id: doc.id
     })
  })
setData(fetchdata)
}
const iddata =data.find((item:any)=> "CHbs6f9GXn8ArdU603OO"===item.id)
console.log(iddata)
useEffect(()=>{
  const uid = localStorage.getItem("Token") || ''
  setUid(uid);
  fetchData();
},[])
  return (
    <Layout>
    <ProtectedRoute>
    <div className="flex py-2 container mx-auto">
      <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
        <h2 className="text-2xl font-semibold">You are logged in!</h2>
      </div>
    </div>
    </ProtectedRoute>
    </Layout>
  )
}
