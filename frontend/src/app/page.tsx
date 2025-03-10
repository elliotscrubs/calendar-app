// fooldal helye (localhost::3000)
'use client';

import dynamic from 'next/dynamic';

const MyTimePicker = dynamic(() => import('@/app/components/TimeInput'), {
  ssr: false,
});


export default function Page() {
  return (
    <main>
      <MyTimePicker />
    </main>
  );
}
