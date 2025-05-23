// app/page.tsx
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Recipe } from '@/types/recipe';
import Header from './components/Header';
import { ChefHat, Lock, ArrowRight } from 'lucide-react';

const ProfessionalSignInButton = () => (
  <SignInButton>
    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto">
      <Lock className="w-5 h-5" />
      <span>Sign In to Continue</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  </SignInButton>
);

export default async function Home() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(data);

  return (
    <>
      <Header />
      
      {/* Show this if user is signed out */}
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 animate-pulse">
              <ChefHat className="w-16 h-16 text-orange-400" />
            </div>
            <div className="absolute bottom-20 right-10 animate-pulse delay-1000">
              <ChefHat className="w-12 h-12 text-red-400" />
            </div>
          </div>

          <div className="text-center max-w-lg mx-auto relative z-10">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <ChefHat className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              Recipe Vault
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>

            {/* Subtitle */}
            <h2 className="text-2xl font-light text-slate-300 mb-4">
              Unlock Your Culinary Journey
            </h2>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              Access premium recipes from world-renowned chefs
            </p>

            {/* Sign In Button */}
            <ProfessionalSignInButton />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <ChefHat className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300">Premium Recipes</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <Lock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300">Secure Access</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                <ArrowRight className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300">Instant Access</p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>

      {/* Show this if user is signed in */}
      <SignedIn>
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
      </SignedIn>
    </>
  );
}