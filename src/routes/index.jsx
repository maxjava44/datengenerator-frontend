import { Title, useNavigate, useRouteData } from "solid-start";
import { createResource } from "solid-js";
import "./bootstrap.min.css"

export function routeData() {
    return import.meta.env.VITE_SERVER;
}

export default function Home() {

  const server = useRouteData();

  const [regions] = createResource(async () => {
    const response = await fetch("http://" + server + ":8080/namen/regions");
    return await response.json();
  });

  const navigate = useNavigate()



  return (
    <main>
      <Title>Namensgenerator</Title>
      <div className="d-flex w-full align-items-center justify-content-center">
        <div className="">
        <For each={regions()}>
          {(region) => <button  style= "margin:20px" type="button" class="btn btn-primary" onClick={() => navigate("/" + region)}>{region}</button>}
        </For>
        </div>

        <button style= "margin:20px" type="button" class="btn btn-primary" onClick={() => navigate("/daten")}>Datengenerator</button>
      </div>

    </main>
  );
}
