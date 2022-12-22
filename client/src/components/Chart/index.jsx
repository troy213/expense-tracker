import {
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

const Chart = (props) => {
  const { chartData, dataKey } = props
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 32,
          left: 16,
          bottom: 5,
        }}
      >
        {dataKey.map((value, index) => {
          const { data, color } = value

          return (
            <Line type='monotone' dataKey={data} stroke={color} key={index} />
          )
        })}
        <CartesianGrid stroke='#ccc' />
        <Legend />
        <XAxis dataKey='name' />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
