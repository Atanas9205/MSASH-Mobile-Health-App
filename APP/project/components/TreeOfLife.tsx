import Svg, { Path, Circle, G } from 'react-native-svg';

interface TreeOfLifeProps {
  size?: number;
  color?: string;
}

export function TreeOfLife({ size = 200, color = '#2E7D32' }: TreeOfLifeProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <G>
        <Path
          d="M100 180 L100 120"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />

        <Path
          d="M100 120 Q60 100 60 70 Q60 40 85 35 Q90 20 100 20 Q110 20 115 35 Q140 40 140 70 Q140 100 100 120"
          fill={color}
          opacity="0.8"
        />

        <Path
          d="M100 100 Q75 90 75 70 Q75 50 90 45 Q95 35 100 35 Q105 35 110 45 Q125 50 125 70 Q125 90 100 100"
          fill="#4CAF50"
          opacity="0.9"
        />

        <Circle cx="100" cy="55" r="15" fill="#66BB6A" />

        <Path
          d="M80 140 Q70 145 65 155 L55 160 Q70 165 75 175"
          fill={color}
          opacity="0.7"
        />

        <Path
          d="M120 140 Q130 145 135 155 L145 160 Q130 165 125 175"
          fill={color}
          opacity="0.7"
        />

        <Circle cx="100" cy="185" r="3" fill="#8D6E63" />
        <Circle cx="95" cy="187" r="2" fill="#8D6E63" />
        <Circle cx="105" cy="187" r="2" fill="#8D6E63" />
      </G>
    </Svg>
  );
}
