const uppercase = (chunk) => chunk.toString().toUpperCase();

const lowercase = (chunk) => chunk.toString().toLowerCase();

const reverse = (chunk) => chunk.toString().split("\n")
                            .map(val => val.split("").reverse().join("").trim())
                            .join("\n");

export default {
    uppercase,
    lowercase,
    reverse,
};