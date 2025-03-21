// fooldal helye (localhost::3000)
"use client";

import dynamic from 'next/dynamic';
import { ToastContainer } from 'material-react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyTimePicker = dynamic(() => import('@/app/components/CreateEventModal'), {
  ssr: false,
});


export default function Page() {
  return (
    <div>
      <MyTimePicker />
      <ToastContainer />      
    </div>
  );
}
