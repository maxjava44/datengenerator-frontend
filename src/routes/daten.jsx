import { createRouteData, Title, useParams, useRouteData } from "solid-start";
import { createEffect, createResource, createSignal, For } from "solid-js";
import "./bootstrap.min.css"
import { isServer } from "solid-js/web";

function zip(...arrays) {
    var returnArray = []
    for (let index = 0; index < arrays[0].length; index++) {
        var tmparr = []
        arrays.forEach(array => {
            tmparr.push(array[index])
        });
        returnArray.push(tmparr)
    }
    return returnArray
}

export default function Home() {

    const server = import.meta.env.VITE_SERVER;

    const [female,setFemale] = createSignal(false)
    const [number,setNumber] = createSignal(0)

    const [namen, { mutate, refetch: refetchNames }] = createResource(async () => {
        const response = await fetch("http://" + server +":8080/namen/" + "Deutschland" + "/" + number() + "/" + female());
        return await response.json();
    });

    const [streets, { mutate: mutateStreets, refetch: refetchStreets }] = createResource(async () => {
        const response = await fetch("http://" + server +":8080/namen/street/" + number());
        return await response.json();
    });

    const [emails, { mutate: mutateEmails, refetch: refetchEmails }] = createResource(async () => {
        const response = await fetch("http://" + server + ":8080/namen/email/" + number());
        return await response.json();
    });

    const [telNrs, { mutate: mutateTel, refetch: refetchTel }] = createResource(async () => {
        const response = await fetch("http://" + server + ":8080/namen/telnr/" + number());
        return await response.json();
    });

    const [datums, { mutate: mutateDate, refetch: refetchDate }] = createResource(async () => {
        const response = await fetch("http://" + server + ":8080/namen/datum/" + number());
        return await response.json();
    });

    function refetch() {
        refetchNames()
        refetchStreets()
        refetchEmails()
        refetchTel()
        refetchDate()
    }

    return (
        <main>
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
                        console.log(zip(namen(),streets(),emails(),telNrs(),datums()))
                        setFemale(e.currentTarget.checked)
                        refetch()
                    }}/>
  <label class="form-check-label mx-3" for="flexSwitchCheckDefault">Weiblich?</label>
                    </div>

                </form>

                <button class="btn btn-primary" onClick={() => {refetch()}}>Reload</button><br></br>
                <button class="btn btn-primary mt-1" onClick={() => {
                    fetch('http://' + server + ':8080/namen/download', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Methods' : '*',
                            'Access-Control-Allow-Headers' : '*'
                        },
                        body: JSON.stringify(zip(namen(),streets(),emails(),telNrs(),datums()))
                    }).then(function(resp) {
                        return resp.blob();
                    }).then(function(blob) {
                        return download(blob, "data.csv");
                    });
                }}>Download as CSV</button><br></br>
                <button type="button" class="btn btn-secondary mt-1" onClick={() => window.location.assign(window.location.origin)}>Back to Start</button>

                <br></br>
                <br></br>

                    <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Adresse</th>
                            <th>E-Mail</th>
                            <th>Tel Nr.</th>
                            <th>Geburtsdatum</th>
                        </tr>
                        <Suspense fallback={<div></div>}>
                            <Index each={namen()} fallback={<div>Loading...</div>}>
                                {(name, index) => (
                                    <tr>
                                        <td>{name}</td>
                                        <td>{streets()[index]}</td>
                                        <td>{emails()[index]}</td>
                                        <td>{telNrs()[index]}</td>
                                        <td>{datums()[index]}</td>
                                    </tr>
                                )}
                            </Index>
                        </Suspense>
                        </tbody>
                    </table>


            </div>


        </main>
    );
}
