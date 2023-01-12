import { createRouteData, Title, useParams } from "solid-start";
import { createEffect, createResource, createSignal, For } from "solid-js";
import "../bootstrap.min.css"
import { isServer } from "solid-js/web";

export default function Home() {

    const [female,setFemale] = createSignal(false)
    const [number,setNumber] = createSignal(0)

    const [namen, { mutate, refetch }] = createResource(async () => {
        const response = await fetch("http://129.159.203.225:8080/namen/" + "Deutschland" + "/" + number() + "/" + female());
        return await response.json();
    });

    return (
        <main>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/downloadjs/1.4.8/download.min.js"></script>
            <Title>Namensgenerator</Title>
            <div class="container">
                
                <br></br>

                <form>
                <label for="customRange3" class="form-label">Wie viele? ({number()})</label>
<input type="range" class="form-range" min="0" max="50" step="1" value="0" id="customRange3" onChange={(e) => {
                    setNumber(e.currentTarget.value)
                    refetch()
                }}/>
                    <div class="mb-3 form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => {
                        setFemale(e.currentTarget.checked)
                        refetch()
                    }}/>
  <label class="form-check-label mx-3" for="flexSwitchCheckDefault">Weiblich?</label>
                    </div>
                    
                </form>

                <button class="btn btn-primary" onClick={() => refetch()}>Reload</button><br></br>
                <button class="btn btn-primary mt-1" onClick={() => {
                    fetch('http://localhost:8080/namen/download', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Methods' : '*',
                            'Access-Control-Allow-Headers' : '*'
                        },
                        body: JSON.stringify(namen())
                    }).then(function(resp) {
                        return resp.blob();
                    }).then(function(blob) {
                        return download(blob, "data.csv");
                    });
                }}>Download as CSV</button><br></br>
                <button type="button" class="btn btn-secondary mt-1" onClick={() => window.location.assign(window.location.origin)}>Back to Start</button>
                
                <br></br>
                <br></br>
                <Suspense fallback={<div></div>}>
                    <For each={namen()}>
                        {(name) => <li>{name}</li>}
                    </For>
                </Suspense>
                
            </div>


        </main>
    );
}