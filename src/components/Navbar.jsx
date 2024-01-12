import React from 'react'
import { useLoginMutation } from '../redux/apis/authApi'

const Navbar = () => {
  const [login,{data}] = useLoginMutation()
  console.log(data);
  return <>
  <div className="h-[4rem] bg-black text-slate-50 p-4">
<div className="flex justify-end items-center gap-3 ">
<p>Name</p>
<p>email</p>
<p>logout</p>
</div>
  </div>
  </>
}

export default Navbar