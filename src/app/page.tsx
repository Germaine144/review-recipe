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
    <main>
      <h1>Recipe List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recipes.map((recipe) => (
          <li key={recipe.slug} style={{ marginBottom: '20px' }}>
            <Link href={`/recipes/${recipe.slug}`}>
              <div style={{ cursor: 'pointer' }}>
                <Image
                  src={`/images/${recipe.image}`}
                  alt={recipe.title}
                  width={300}
                  height={200}
                />
                <h2>{recipe.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
