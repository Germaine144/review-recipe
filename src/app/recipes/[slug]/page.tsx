// app/recipes/[slug]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import { Recipe } from '@/types/recipe';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(data);
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(data);
  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <main>
      <Link href="/">← Back to Recipes</Link>
      <h1>{recipe.title}</h1>
      <Image src={`/images/${recipe.image}`} alt={recipe.title} width={400} height={300} />
      <h2>Ingredients</h2>
      <ul>{recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul>
      <h2>Steps</h2>
      <ol>{recipe.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </main>
  );
}
