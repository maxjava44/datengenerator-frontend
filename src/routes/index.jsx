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
      <div className="center" style="margin:auto">
        <For each={regions()}>
          {(region) => <button  style= "margin:20px" type="button" class="btn btn-primary" onClick={() => navigate("/" + region)}>{region}</button>}
        </For>
      </div>
      
    </main>
  );
}
