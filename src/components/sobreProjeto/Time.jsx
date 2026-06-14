import CardMembros from "./CardMembros";
import timeData from "../../data/time";

function Time() {
  return (
    <section className="team-section py-5">

      <div className="container">

        <h2 className="section-title text-center mb-5 fw-bold">
          Nossa Equipe
        </h2>

        <div className="row g-4 justify-content-center">

          {timeData.map((membro, index) => (
            <div
              className="col-12 col-sm-6 col-lg"
              key={index}
            >
              <CardMembros membro={membro} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Time;