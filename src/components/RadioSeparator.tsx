import _ from "lodash";

type RadialSeparatorsProps = {
  count: number,
  style: {
    background?: string,
    height?: string,
    width?: string
  }
}

type SeparatorProps = {
  turns: number,
  style: {
    background?: string,
    height?: string,
    width?: string
  }
}

function Separator(props: SeparatorProps) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`
      }}
    >
      <div style={props.style} />
    </div>
  );
}

function RadialSeparators(props: RadialSeparatorsProps) {
  const turns = 1 / props.count;
  return _.range(props.count).map(index => (
    <Separator turns={index * turns} style={props.style} />
  ));
}

export default RadialSeparators;