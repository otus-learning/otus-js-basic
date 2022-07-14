import { curry } from "./curry";
import { sum } from "./sum";
import { Parallel } from "./parallel";
import { spiral } from "./spiral";
import { semverSort } from "./semver";

document.body.onload = async function () {
	const func = (a? : number, b? : number, c? : number, d? : number, e? : number) : number => {return (a || 0) + (b || 0) + (c || 0) + (d || 0) + (e || 0)};
	const hof = curry(func);
	console.log(hof(1, 2, 3, 4, 5)); // 15
	console.log(hof(2, 3, 4)(5, 6)); // 20
	console.log(hof(3, 4)(5, 6)(7)); // 25
	console.log(hof(4, 5)(6)(7, 8)); // 30
	console.log(hof(5)(6)(7)(8)(9)); // 35

	alert(sum()); // 0;
	const s = sum();
	alert(s(1)); // 1
	alert(s(1)(2)); //3
	alert(s(3)(4)(5)); // 12
	const s3 = sum(3);
	alert(s3(5)); // 8
	alert(s3(6)); // 9

	const runner = new Parallel(2);
	console.log(await runner
	.jobs(
	() => new Promise((resolve) => setTimeout(resolve, 10, 1)),
	() => new Promise((resolve) => setTimeout(resolve, 50, 2)),
	() => new Promise((resolve) => setTimeout(resolve, 20, 3)),
	() => new Promise((resolve) => setTimeout(resolve, 90, 4)),
	() => new Promise((resolve) => setTimeout(resolve, 30, 5)),
	)) // [1, 3, 2, 4, 5];


	console.log(spiral([
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19]
	])); // [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]

	console.log(semverSort([ "1.0.5", "2.5.0", "0.12.0", "1", "1.23.45", "1.4.50", "1.2.3.4.5.6.7"])); // [ "0.12.0", "1", "1.0.5", "1.2.3.4.5.6.7", "1.4.50", "1.23.45", "2.5.0" ]
};
