import { Title, useParams, useRouteData } from "solid-start";
import { createResource, For } from "solid-js";
import "./bootstrap.min.css"


export default function Home() {

    return (
        <main>
            <Title>Namensgenerator</Title>
            <button type="button" class="btn btn-secondary" onClick={() => window.location.assign(window.location.origin)}>Back to Start</button>
            <p>Hello</p>
        </main>
    );
}