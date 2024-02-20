import React from 'react'
import { useEffect, useState } from 'react'
import './App.css';
import { deepCopy ,formatTime } from './common/utils';
import TimeInput from './component/time-input';
function App() {
  const [n, setN] = useState(1);
  const [S, setS] = useState(43);
  const [K, setK] = useState(1.07);
  const [k, setk] = useState(1.07);
  const [D, setD] = useState(0);
  const [t, setT] = useState(0);
  const [result, setResult] = useState([])
  const [teamsData, setTeamsData] = useState([]);
  const [teamResult , setTeamResult] = useState(0);
  useEffect(() => {
    const data = localStorage.getItem('teamsData');
    if (data) {
      const res = JSON.parse(data)
      for(let t of res){
          t.age = Number(t.age);
          t.time = Number(t.time);
      }
      setTeamsData( res);
    }
  }, [])
  const generate = () => {
    if(teamsData.length < 5){
      alert('人数不够呀')
    }
    const teams = femaleReduce();
    console.log(teams)
    teams.sort((a,b)=>{
      return Number(a.time) - Number(b.time)
    })
    setResult(teams);
    setTeamResult( Number(teams[5].time) - ageReduce() + Number(t))
  }

  const femaleReduce = ()=>{
    const teams = deepCopy(teamsData);
    for(let t of teams){
      if(t.gender === 'female'){
        let res = Math.ceil(S * K * Math.pow(k, n - 1) * D);
        const mod = res % 30;
        if (mod >= 15) {
          res += (30 - mod);
        } else {
          res -= mod;
        }
        t.time -= res;
        console.log(res)
      }
    }
    return teams;
  }
  const ageReduce = ()=>{
    let ageSum = 0;
    for(let t of teamsData){
      ageSum += Number(t.age);
    }
    const averageAge = Math.ceil(ageSum / teamsData.length);
    return (averageAge - 40) * ( n <= 2 ? 40 : 30); 
  }
  const handleChange = (event , index , type) => {
    const teams = [...teamsData];

    teams[index][type] = event.target.value;
    setTeamsData(teams);
    localStorage.setItem('teamsData', JSON.stringify(teams));
  }
  const addMember = () => {
    const teams = [...teamsData, {
      age: 40,
      gender: 'female',
      time: 0,
      name:'张三'
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
              姓名: <input type="text" value={i.name} onChange={(e)=>handleChange(e, index , 'name')} />
            </label>
            <label>
              年龄: <input type="number" value={i.age} onChange={(e)=>handleChange(e, index , 'age')} />
            </label>
            <label>
              性别:  <select value={i.gender} onChange={(e)=>handleChange(e, index, 'gender')}>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </label>
            <label>
              成绩: <TimeInput  value={i.time} onChange={e=>handleChange(e, index , 'time')}></TimeInput>
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
        <label>
          当日罚时: <input type="number" value={t} onChange={e => setT(e.target.value)} />
        </label>
        <button onClick={generate}>
          生成
        </button>
        {result.map((i,index)=>{
          return <div key={index}> {`${i.name}`}:{`${formatTime(i.time)}`} </div>
        })}
        <label>
            团队成绩:{formatTime(teamResult)}
        </label>
      </div>
    </>
  )
}

export default App
