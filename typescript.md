
# Typescript
## Logical operators
### Shorthand ternary operator `||`
Returns the right-hand side operand if the left operand is any falsy value, not only null or undefined.
```
return null || that
// will return that
return false || that
// will return that
```

[Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

### Nullish coalescing `??`
Returns the right-hand side operand when its left-hand side operand is null or undefined.
```
return null ?? that
// will return that
return false ?? that
// will return false
```

[Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

### Logical conjunction `&&`
Is true if and only if all of its operands are true.
If left side can be converted to true, returns right side; else, returns left side.
```
return User && User.isAdmin
// If there is a user, returns its admin value
```

[Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

## Generics
### Type argument interface `T`
We want the compiler to set the value of T for us automatically based on the type of the argument we pass in:
```
function identity<T>(arg: T): T {}
let output = identity("myString");
// The type of the output will be string
```

[Docs](https://www.typescriptlang.org/docs/handbook/generics.html#generic-types)

### Default generic
You can provide a default type to a generic. The `<>` syntax is reserved for describing a generic type.
```
export interface Relationship<TTargetEntity extends Entity = Entity> {...}
// Relationship will default to Relationship<Entity>
```

### Union types `|`
A union type only grabs the common properties of the types.
```
interface AUnion {
   thing: string | number;
}
```
If we have a value that is a union type, we can only access members that are common to all types in the union.
```
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Only available in one of the two possible types
pet.swim();
// Property 'swim' does not exist on type 'Bird | Fish'.
// Property 'swim' does not exist on type 'Bird'.
```

`map()`ing over union types is [impossible](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html#improved-behavior-for-calling-union-types)
```
export interface VehicleSerializerSelectableValuesMap {
  country: Country[];
  vehicletype: VehicleType[];
  doors: number[];
  count: string[];
}
const VSMap: VehicleSerializerSelectableValuesMap = {...//filled with properties};
Object.keys(VSMap).forEach(key => VSMap[key].map()) 
// This breaks
```
This is impossible because `map()` cannot treat `number[]`, `string[]`, etc the same since they are generics.
This is only impossible when at most one of the type in the union has multiple overloads (`string`, `number`), and at
most one type in the union is a generic. A way around this is to instead of having `string[] | number[]` you can have `(string | number)[]`. That way the map signature is always the same, but with `string[] | number[]` `map` has to make a choice every time


[Docs](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html?ref=hackernoon.com)

### Intersection types `&`
Combines all properties of each type into one type
```
interface Cat {
  meow: void;
}
interface Dog {
  bark: void;
}
interface Cow {
  moo: void;
}
type AnimalSounds = Cat & Dog & Cow;
const makeSound = (sound: AnimalSounds) => sound.moo;
const makeSound = (sound: AnimalSounds) => sound.meow;
```

### mapped types
```
type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };
// is the same as...
type Flags = {
  option1: boolean;
  option2: boolean;
};
```
<span style="color: red">An index signature cannot be a union type. Consider using a mapped object type instead</span>
[Issue](https://github.com/Microsoft/TypeScript/issues/24220)
The fix is to convert it to a `type` instead of an `interface` and use the `in` operator

### unknown
`unknown` is the set of all possible values. Any value can be assigned to a variable of type `unknown`. This means
`unknown` is a supertype of every other type. Also called a top type. `unkown` is a typesafe version of `any`. No operations
are permitted on `unkown` without first asserting or narrowing to a more specific type.
```
let vAny: any = 10;          // We can assign anthing to any
let vUnknown: unknown =  10; // We can assign anthing to unknown just like any 


let s1: string = vAny;     // Any is assigable to anything 
let s2: string = vUnknown; // Invalid we can't assign vUnknown to any other type (without an explicit assertion)
```

### never
`never` is the empty set. There is no value that can be assigned to variable of type `never`. 


#### never vs unknown vs any
Use `never` in positions where there will not or should not be a value. Use `unknown` where there will be a value, but it might have any type. Avoid using any unless you really need an unsafe escape hatch.


## IIFE
Immediately invoked function expressions are a way to not pollute the global space.
```
(() => console.log('hello'))()
```
will have its own scope and cannot be used outside that scope versus
```
const fn = () => console.log('hello)
fn()
```
can be called and executed within the global scope
