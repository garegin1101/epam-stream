import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import operations from "./operations/index.js";

const { signal } = new AbortController();

export default async ( [ input_file, output_file, operation ] ) => {

    if (!(operation in operations)) throw Error("Invalid input: Operation doesn't exist");

    try {
        await pipeline(
            createReadStream(input_file)
                // Nowdays
                .map(operations[operation]),

            // Old school
            /* 
             async function* (source) {
                for await (const chunk of source) {
                    yield operations[operation](chunk)
                }
            }, 
            */

            // Ancient
            /* 
            new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, operations[operation](chunk));
                },
            }),
            */

            createWriteStream(output_file),

            // When the signal is aborted, destroy will be called on the underlying pipeline, with an AbortError.
            { signal }
        );


        console.log('Success');

    } catch (err) {
        // Error messages are descriptive, for that reason I don't add extra stuff
        console.log(err.message);

    }
};