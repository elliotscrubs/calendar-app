// fooldal helye (localhost::3000)
"use client";

import dynamic from 'next/dynamic';

const MyTimePicker = dynamic(() => import('@/app/components/CreateEventModal'), {
  ssr: false,
});


export default function Page() {
  return (
    <div>
      <MyTimePicker />
    </div>
  );
}
