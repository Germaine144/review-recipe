import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(data);
  
  return (
    <main className="min-h-screen bg-amber-50 px-4 py-8">
      <h1 className="pt-6 font-bold text-center text-6xl pb-10 text-amber-800 font-serif">Recipe List</h1>
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <li key={recipe.slug} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href={`/recipes/${recipe.slug}`} className="block h-full">
                <div className="relative h-64 w-full">
                  <Image 
                    src={`/images/${recipe.image}`} 
                    alt={recipe.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h2 className="font-medium text-lg mb-2 text-gray-800">{recipe.title}</h2>
                  <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md w-full transition-colors duration-200 cursor-pointer">
                    View Ingredients
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}