// react
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

// hoc
import useLocalStorage from "../../../hoc/useLocalStorage";

// css
import './Information.css';

const Information = () => {

  useEffect(() => {
    UserId === "0" &&
      mySwal.fire({icon: 'error', title: '실패', text: '올바른 접근 경로가 아닙니다'}).then((result) => {
        history.push('/');
      });
    sessionCheck();
  }, []);

  const mySwal = require('sweetalert2');
  const history = useHistory();
  const [Phone, setPhone] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [UserId, setUserId] = useLocalStorage("userId", "0");
  const [UserName, setUserName] = useLocalStorage("userName", "");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value);
  }

  const sessionCheck = (event) => {
    axios({
      url: 'http://127.0.0.1:5000/auth/api/session_check',
      method:'GET',
    }).then(function (response) {
      if ( UserId != "0" && !response['data']['session'] ) {
        mySwal.fire({icon: 'success', title: '성공', text: '세션이 만료되었습니다. 로그인 페이지로 이동합니다'}).then((result) => {
          setUserId("0");
          setUserName("");
          history.push('/Login');
        });
      }
    }).catch(function(error){
      mySwal.fire({icon: 'error', title: '실패', text: '알수 없는 문제로 새션 확인을 실패했습니다'});
    });
  }
  const getMemberInformation = (event) => {
    axios({
      url: 'http://127.0.0.1:5000/auth/api/get_information',
      method:'POST',
      data:{
        userId: {UserId},
      }
    }).then(function (response) {
      if ( response['data']['result'] === '000000' ) {
        setPhone(response['data']['userPhone']);
        setName(response['data']['userName']);
      }
    }).catch(function(error){
      mySwal.fire({icon: 'error', title: '실패', text: '알수 없는 문제로 회원정보 가져오기를 실패했습니다'});
    });
  }
  const onChangeClick = () => {
    if (Name === '' ) mySwal.fire({icon: 'error', title: '실패', text: '이름을 입력해주세요'});
    else if (Password === '' ) mySwal.fire({icon: 'error', title: '실패', text: '비밀번호를 입력해주세요'});
    else if (PasswordConfirm === '' ) mySwal.fire({icon: 'error', title: '실패', text: '비밀번호 확인을 입력해주세요'});
    else if (Password !== PasswordConfirm ) mySwal.fire({icon: 'error', title: '실패', text: '비밀번호가 일치하지 않습니다'});
    else 
      axios({
        url: 'http://127.0.0.1:5000/auth/api/change_information',
        method:'POST',
        data:{
          name: {Name},
          password: {Password},
        }
      }).then(function (response) {
        if ( response['data']['result'] === '000000' ) {
          mySwal.fire({icon: 'success', title: '성공', text: '회원정보 변경이 완료됐습니다'});
          setUserName(response['data']['userName']);
          history.push('/');
        }
      }).catch(function(error){
        mySwal.fire({icon: 'error', title: '실패', text: '알수 없는 문제로 회원정보 변경이 실패했습니다'});
        setPassword('');
        setPasswordConfirm('');
      });
  }

  useEffect(() => {
    getMemberInformation();
  }, []);
  
  return(
    <div className="information_wrap">
      <form method="post" autocomplete="off">
        <div>
          <div>
            <p><span>휴대폰번호</span><span>*</span></p>
            <input type="text" value={Phone} readOnly />
          </div>
          <div>
            <p> <span>성명</span><span>*</span></p>
            <input type="text" value={Name} onChange={onNameHandler} />
          </div>
        </div>
        <div>
          <div>
            <p><span>비밀번호</span><span>*</span></p>
            <input type="password" autocomplete="off" value={Password} onChange={onPasswordHandler} />
          </div>
          <div>
            <p><span>비밀번호 확인</span><span>*</span></p>       
            <input type="password" autocomplete="off" value={PasswordConfirm} onChange={onPasswordConfirmHandler} />
          </div>
        </div>
        <p>
          <span onClick={onChangeClick}>변경하기</span><Link to="/">취소</Link>
        </p>
      </form>
    </div>
  )
    
}

export default Information;