import { useRenameContext } from '@/providers/RenameProvider'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useEffect, useRef } from 'react'

export default function RenameForm() {
  const { oldTitle, update, cancel } = useRenameContext()
  const inputRef = useRef(null)

  const onSubmit = (e) => {
    inputRef.current.blur()
    update(inputRef.current.value)
    cancel()
    e.preventDefault()
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (isTargetElement(e, ['#title'])) {
        if (e.key === keys.ESC) {
          inputRef.current.blur()
          cancel()
        }
      }
      if (e.key === keys.ENTER) {
        onSubmit(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [onSubmit, cancel])

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '1rem',
        backgroundColor: 'white',
        border: '1px solid black',
        zIndex: 99999999999999,
        color: 'black',
        borderRadius: '12px',
      }}
    >
      <h4>名前の編集</h4>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <label htmlFor='title'>名前</label>
        <input
          ref={inputRef}
          defaultValue={oldTitle}
          name='title'
          id='title'
          label=''
          type='text'
          style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            borderRadius: '12px',
            border: '1px solid black',
            width: '15rem',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          marginTop: '1rem',
        }}
      >
        <button
          type='button'
          onClick={cancel}
          className='button button_cancel'
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            border: '1px solid gray',
            color: 'gray',
            background: 'white',
            width: '6rem',
          }}
        >
          キャンセル
        </button>
        <button
          type='button'
          onClick={onSubmit}
          className='button button_ok'
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            border: '1px solid #1976d2',
            color: 'white',
            background: '#1976d2',
            width: '6rem',
          }}
        >
          保存
        </button>
      </div>
    </div>
  )
}
