import { useEffect, useState } from 'react'
import './App.css';
function App() {
  const [n, setN] = useState(1);
  const [S, setS] = useState(43);
  const [K, setK] = useState(1.07);
  const [k, setk] = useState(1.07);
  const [D, setD] = useState(0);
  const [age, setAge] = useState(0);
  const [result, setResult] = useState(0)
  const [teamsData, setTeamsData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('teamsData');
    if (data) {
      setTeamsData( JSON.parse(data));
    }
  }, [])
  const generate = () => {
    let res = Math.ceil(S * K * Math.pow(k, n - 1) * D);
    const mod = res % 30;
    if (mod >= 15) {
      res += (30 - mod);
    } else {
      res -= mod;
    }

    setResult(res);
  }
  const handleChange = (event) => {

  }
  const addMember = () => {
    const teams = [...teamsData, {
      age: 35,
      gender: 'famale',
      time: 0
    }];
    localStorage.setItem('teamsData', JSON.stringify(teams));
    setTeamsData(teams);
  }

  const onRemove = (i)=>{
    const teams = [...teamsData];
    teams.splice(i , 1);
    setTeamsData(teams);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={addMember}>添加</button>
        {teamsData.map((i, index) => {
          return <div key={index}>
            <label>
              年龄: <input type="number" value={i.age} onChange={handleChange} />
            </label>
            <label>
              性别:  <select name="" id="">
                <option value="">男</option>
                <option value="">女</option>
              </select>
            </label>
            <label>
              成绩: <input type="number" value={i.time} onChange={handleChange} />
            </label>
            <button onClick={()=>onRemove(index)}>
              删除
            </button>
          </div>

        })}
        <label>
          第几天: <input type="number" value={n} onChange={e => setN(e.target.value)} />
        </label>

        <label>
          性别差异常数: <input type="number" value={S} onChange={e => setS(e.target.value)} />
        </label>

        <label>
          环境综合系数: <input type="number" value={K} onChange={e => setK(e.target.value)} />
        </label>

        <label>
          体能衰减系数: <input type="number" value={k} onChange={e => setk(e.target.value)} />
        </label>

        <label>
          当日里程数: <input type="number" value={D} onChange={e => setD(e.target.value)} />
        </label>
        <button onClick={generate}>
          生成
        </button>
        减时 :{result}
      </div>


    </>
  )
}

export default App
