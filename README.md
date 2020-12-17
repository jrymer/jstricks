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
most one type in the union is a generic.


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

# React
### Lifecycle notes
* `React.userEffect()` is called after every render
* `React.useMemo()` will not re evaluate during a render cycle if its dependencies have not changed
### Memoization
#### React.PureComponent
Only available to classes. Implements the componentShouldUdpdate() lifecycle method to compare shallow props and state comparison from the previous render. If these match, the component will not re-render.
#### React.memo()
### children
```
interface Props {
	children: React.ReactNode;
}
const MyComponent: React.FC<Props> = ({children}) => {} 
```
The above code will throw an eslint error that `children is missing in prop validation`.
To fix this, although redundant, double type the props as follow:
```
const MyComponent: React.FC<Props> = ({children}: Props) => {} 
```
### Selectors
#### createSelector
Protects componets from re rendering. Checks to see if anything changed, if nothing in the selector has changed, then do not re render. `createSelector` is a way of cahcing the result of the derived/calculated values based on state so that you don't pay the tax for re-caculating/re-allocating memory every render. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.
#### useSelector
A selector is a function that returns portions of state or some derived value based on state values.
`useSelector()` is simply a hook that takes one of those functions and returns the results hooked up to your redux state.
The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector).


# MUI
### Default theme
The gist of why we don’t use `@material-ui/styles` is it doesn’t get MUI’s default theme, it’s only meant to be use as a standalone styling option for use without MUI. `@material-ui/core/styles` on the other hand is a re-exported version of the same code but with the MUI default theme. `ThemeProvider` should also be imported from `@material-ui/core/styles` for the same reasons.

### Overridding styles
To access an inner component (`TextField` is a wrapper over `InputBase`). Use the `InputProps` property
```
InputProps: {{
	classes: {
		input: classes.override
	}
}}
```

# Docker
### Hot reloading vs rebuilding
If you make changes to the service code, e.g. add more logging or a `print('hello world')` statements, the service will restart/reinitialize, and tailing the logs with `docker-compose logs -f plexus` would show you that. Rebuilding all of it will do the same thing but costs more time.
Flask apps built on pymera/flask-pymera will hot restart the app if you change any files. If you change a setting or anything docker related you’ll need to rebuild.

### Commands
* `docker-compose exec <container id> bash` ssh into a container


# Additional notes
* `Object.keys()` returns `string[]` if we want the keys to be of a specific type we need to do `Object.keys() as (keyof Type)[]`
* If the error `Addess is in use` pops up
	> `sudo lsof -i :port`
	
	> `sudo kill -9 PID`
* We upgraded to babel 7, babel 7 just compiles even if TS fails, then later we switched our linting to be eslint from TS lint and upgraded our TS to 3.8. And somewhere along that trail typing stopped getting enforced so i’d see them if i opened a file that had a typing problem but the build would be fine so we’d ignore. So i added a plugin that i added to continuum cause they had the same problem. The plugin runs typescript compiler in a different thread.
webpack is:
  > running babel
  
  > running this plugin that runs tsc
	
