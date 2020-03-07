import cleanIngredient from "./ingrediant_cleaning";

export default class Sababa {

    constructor(meat, carb, piquant, startWaitCB, stopWaitCB) {
        this.meat = meat;
        this.carb = carb;
        this.piquant = piquant;
        this.startWaitCB = startWaitCB;
        this.stopWaitCB = stopWaitCB;

        this.data = require('../data/recipes/yummly_' + meat + '_' + carb + '_' + piquant);

        this.orderedRecipes = this.orderRecipes();

        this.cat = {};
        this.ing = {};
        this.vectorDict = {};
        this.sectionDict = {};
        this.count = 0;

        this.loved_recipes = [];
        this.hated_recipes = [];
        this.ingredient_occurence = {};
        this.key = this.meat + '_' + this.carb + '_' + this.piquant;

        this.load();
    }

    load() {
        let data = localStorage.getItem(this.key);
        if (data == null) {
            return;
        }

        data = JSON.parse(data);
        this.vectorDict = data.vectorDict;
        this.count = data.count;
        this.loved_recipes = [...this.data].filter((x) => data.loved_recipes.includes(x));
        this.hated_recipes = [...this.data].filter((x) => data.loved_recipes.includes(x));
        this.ingredient_occurence = data.ingredient_occurence;
    }

    save() {
        let data = {
            count: this.count,
            vectorDict: this.vectorDict,
            loved_recipes: this.loved_recipes.map((x) => x['id']),
            hated_recipes: this.hated_recipes.map((x) => x['id']),
            ingredient_occurence: this.ingredient_occurence
        };
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    orderRecipes() {
        return [...this.data.recipes].sort((x, y) => y['yums'] - x['yums']);
    }

    determineWeight(ing) {
        this.startWaitCB();
        let min = 1000000;
        let max = 0;

        for (let x in Object.keys(this.ingredient_occurence)) {
            if (this.ingredient_occurence[x] > max) {
                max = this.ingredient_occurence[x];
            }
            if (this.ingredient_occurence[x] < min) {
                min = this.ingredient_occurence[x];
            }
        }
        this.stopWaitCB();
        return (max - this.ingredient_occurence[ing] + 1) / (max - min);
    }

    buildVector() {
        this.startWaitCB();
        for (let x in Object.keys(this.orderedRecipes)) {
            let recipe = this.orderedRecipes[x];
            for (let y in Object.keys(recipe['ingredients'])) {
                let ingredient = recipe['ingredients'][y];
                let cat = ingredient['category'];
                let ing = ingredient['name'];
                let filt = cleanIngredient(ing, cat);
                if (filt !== '') {
                    if (!(filt in this.ingredient_occurence)) {
                        this.ingredient_occurence[filt] = 1;
                    } else {
                        this.ingredient_occurence[filt] += 1;
                    }
                    this.vectorDict[filt] = 0;
                }
            }
        }
        this.save();
        this.stopWaitCB();
    }

    incrementWieghtTop(category, ingredient, rating) {
        this.startWaitCB();
        for (let v = 0; v < Math.ceil(this.orderedRecipes.length / 4); ++v) {
            let ingredientDictionary = {};
            let rec = this.orderedRecipes[v];
            for (let x in Object.keys(rec['ingredients'])) {
                let ing = rec['ingredients'][x];
                let name = ing['name'];
                let cat = ing['category'];
                let filt = cleanIngredient(name, cat);
                ingredientDictionary[filt] = 1;
            }
            for (let k in Object.keys(ingredientDictionary)) {
                this.vectorDict[k] += 0.5;
            }
        }
        this.save();
        this.stopWaitCB();
    }

    incrementWeightUser(rec, rating) {
        this.startWaitCB();
        if (rating === 1) {
            this.loved_recipes.push(rec);
        } else {
            this.hated_recipes.push(rec);

        }

        this.count += 1;
        let ingredientDictionary = {};

        for (let v in Object.keys(rec['ingredients'])) {
            let ing = rec['ingredients'][v];
            let name = ing['name'];
            let cat = ing['category'];
            let filt = cleanIngredient(name, cat);
            ingredientDictionary[filt] += 1;
        }
        for (let k in Object.keys(ingredientDictionary)) {
            this.vectorDict[k] += rating / 2;
        }
        this.save();
        this.stopWaitCB();
    }

}