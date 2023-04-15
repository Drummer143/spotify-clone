import { isURL } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import stream, { Stream } from "stream";

// eslint-disable-next-line camelcase
export default async function image_proxy(req: NextApiRequest, res: NextApiResponse) {
    let url = req.query.uri;

    if (!url) {
        res.status(400).json({ message: "no url provided" });
        return;
    }

    if (Array.isArray(url)) {
        url = url[0];
    }

    // build full url if the was taken from public folder
    if (!isURL(url) && req.headers.referer && isURL(req.headers.referer)) {
        const serverUrl = new URL(req.headers.referer);

        url = `${serverUrl.protocol}//${serverUrl.host}${url}`;
    }

    const image = await fetch(url);

    const passThrough = new Stream.PassThrough();

    stream.pipeline(image.body as unknown as NodeJS.ReadableStream, passThrough, error => {
        if (error) {
            res.status(422).send({ message: "Couldn't fetch the image" });
            return;
        }
    });

    res.status(200);
    passThrough.pipe(res);
}
