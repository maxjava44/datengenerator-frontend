import { Title, useNavigate } from "solid-start";
import { createResource } from "solid-js";
import "./bootstrap.min.css"

export default function Home() {



  const [regions] = createResource(async () => {
    const response = await fetch("http://129.159.203.225:8080/namen/regions");
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
