export default () => {
    const [, , ...parameters] = process.argv;

    if (parameters.length !== 3) throw RangeError("invalid input : 3 arguments needed");

    return parameters;
}