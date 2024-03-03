import Link from 'next/link';

const LoginBlock = () => {
  return (
    <form
      action='https://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/search/patronlogin.patronloginform.loginpageform/false?dt=list&t:ac=https:$002f$002ftghtpe.ent.sirsidynix.net$002fclient$002fzh_TW$002f/vgh/$002f'
      method='post'
      id='loginPageForm'
      className='form'
      target='_blank'
    >
      <input
        name='t:ac'
        type='hidden'
        value='https:$002f$002ftghtpe.ent.sirsidynix.net$002fclient$002fzh_TW$002fvgh$002f'
      />
      <input
        name='t:formdata'
        type='hidden'
        value='Zr4VRPbK/trm2JymshjK7Jgi/Bk=:H4sIAAAAAAAAAJ1RP0vDQBR/DbRUuykO4uKgg6iXDnbRxSKIQpBCcHEpl8s1vZLcnXdXky5Ogp/BxU8gTgruHdz8Dn4AFwcnB5OUaqUgjdvjx/v9ee939wblGMGWpliRrt3CRgnuiIDxXZnPYTZ3hIqQoYnpMBr6WkFDqABhiUmXIoMl1UYNGogIRUPmIQ9rippeCmJiDjPKmktNX66fDmuvS8+fFpQcqBHBU4PwBEfUwILTwxfYDjEPbNcoxoO9RBqY+zb9R8hm0ZAtJQjV2u17EdOaCT6893c6H7cvFkAi4zqgIgnadX0OlwAGahNYcZVMpBxvwsYMtC7zfcrT2/f/vJ2ISApOudHoKGdMn352vbqYrDxVprrK4pSybiojs9iG7RmS9dp9TRVPBcZfmf+BCmuMfjIrS2KtY6H8CecxVFijSBs6+6Yp0kb+fzPdxo37vvz4cHVggeVAlYQs3T7Os2Tt0JBGKfCrnerIvF2fGL8AdbZXou0DAAA='
      />
      <input name='hidden' type='hidden' value='SYMWS2016041' />
      <input
        name='textfield'
        type='hidden'
        value='https://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/'
        id='textfield'
      />
      <input name='textfield_0' type='hidden' id='textfield_0' />
      <article className='row'>
        <section className='row__col row__col--12'>
          <label htmlFor='j_username' className='form__input'>
            <b>借閱證號碼: (借閱證號碼組成請詳下方【登入說明】)</b>
            <input
              id='j_username'
              name='j_username'
              type='text'
              placeholder='請輸入借閱證號碼'
            />
          </label>
        </section>
        <section className='row__col row__col--12'>
          <label htmlFor='j_password' className='form__input'>
            <b>密碼: </b>
            <input
              id='j_password'
              name='j_password'
              type='password'
              placeholder='請輸入密碼'
            />
          </label>
        </section>
        <section className='row__col  row__col--12'>
          <span>
            首次登入請【忘記密碼】，並重設您的密碼
            (【重設密碼】訊息將會寄至您在圖書館所註冊的電子郵件信箱)
          </span>
        </section>
        <section className='row__col login-layout__actions'>
          <input
            value='登入系統'
            id='submit_0'
            name='submit_0'
            type='submit'
            className='btn btn--radius'
          />
          <Link
            href={
              'https://tghtpe.ent.sirsidynix.net/client/zh_TW/vgh/changepinpage/SYMWS/vgh/$N'
            }
          >
            <a className='btn btn--radius btn--accent-border' target={'_blank'}>
              忘記密碼
            </a>
          </Link>
        </section>
      </article>
    </form>
  );
};

export default LoginBlock;
