// 'use client';

// import type { NextPage } from 'next';
// import { usePathname } from 'next/navigation';

// const ReadingURL = () => {
//   const [namePart, year] = usePathname().split('+');
//   const [, , name] = namePart.split('/');
//   const movieName = name.replaceAll('%20', '+');

//   return [movieName, year];
// };

// async function fetchData(name: string, year: string) {
//   try {
//     const response = await fetch(
//       `http://www.omdbapi.com/?t=${name}&y=${year}&plot=ful&apikey=42a36590`
//     );
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// }

// const Top100: NextPage = async () => {
//   const [name, year] = ReadingURL();
//   const movieData = await fetchData(name, year);
//   console.log(movieData);
//   return (
//     <div>
//       <div>{movieData.Title}</div>
//     </div>
//   );
// };

// export default Top100;
