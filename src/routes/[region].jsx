import { Title, useParams, useRouteData } from "solid-start";
import { createResource, For } from "solid-js";
import "./bootstrap.min.css"

export function routeData() {


    const params = useParams()
    const [countries] = createResource(async () => {
        const response = await fetch("http://"+import.meta.env.VITE_SERVER +":8080/namen/countries/" + params.region);
        return (await response.json());
    });
    return {countries}
}

export default function Home() {
    const {countries} = useRouteData()



    function renderCountries() {
        let maxI = 0
        for (const key in countries()) {
            if (Object.hasOwnProperty.call(countries(), key)) {
                maxI++
            }
        }
        const rendering = []
        for (let country = 0; country < maxI; country += 3) {
            if (Object.hasOwnProperty.call(countries(), country) && Object.hasOwnProperty.call(countries(), country + 1) && Object.hasOwnProperty.call(countries(), country + 2)) {
                rendering.push(
                    <div class="row">
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country])} type="button" class="btn btn-primary mb-3 ">{countries()[country]}</button>
                        </div>
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country+1])} type="button" class="btn btn-primary mb-3">{countries()[country + 1]}</button>
                        </div>
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country+2])} type="button" class="btn btn-primary mb-3">{countries()[country + 2]}</button>
                        </div>
                    </div>
                )
            } else if (countries().hasOwnProperty(country) && Object.hasOwnProperty.call(countries(), country + 1)) {
                rendering.push(
                    <div class="row">
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country])} type="button" class="btn btn-primary mb-3 ">{countries()[country]}</button>
                        </div>
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country+1])} type="button" class="btn btn-primary mb-3">{countries()[country + 1]}</button>
                        </div>
                        <div class="col"></div>
                    </div>
                )
            } else if (Object.hasOwnProperty.call(countries(), country)) {
                rendering.push(
                    <div class="row">
                        <div class="col">
                            <button onClick={() => window.location.assign(window.location.origin + "/land/" + countries()[country])} type="button" class="btn btn-primary  mb-3">{countries()[country]}</button>
                        </div>
                        <div class="col"></div>
                        <div class="col"></div>
                    </div>
                )
            }
        }
        return rendering
    }

    return (
        <main>
            <Title>Namensgenerator</Title>
            <div class="container text-center">
                {renderCountries}
            </div>
            <button type="button" class="btn btn-secondary" onClick={() => window.location.assign(window.location.origin)}>Back to Start</button>

        </main>
    );
}
