import { useRenameContext } from '@/providers/RenameProvider'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import locale from '@/utils/locale'
import { useCallback, useEffect, useRef } from 'react'

export default function RenamePortal() {
  const { isRename, oldTitle, update, cancel } = useRenameContext()
  const inputRef = useRef(null)

  const onSubmit = useCallback(
    (e) => {
      if (inputRef?.current) {
        inputRef.current.blur()
        update(inputRef.current.value)
        cancel()
        e.preventDefault()
      }
    },
    [update, cancel]
  )

  useEffect(() => {
    if (isRename && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [isRename])

  useEffect(() => {
    if (isRename && inputRef?.current) {
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
      document.body.addEventListener('keydown', handler)
      return () => {
        document.body.removeEventListener('keydown', handler)
      }
    }
  }, [isRename, onSubmit, cancel])

  if (!isRename) {
    return null
  }

  return (
    <div className='rename_container'>
      <h4>{locale('rename_title')}</h4>
      <div className='rename_input_row'>
        <label htmlFor='title'>{locale('title')}</label>
        <input
          className='rename_input'
          ref={inputRef}
          defaultValue={oldTitle}
          name='title'
          id='title'
          label=''
          type='text'
        />
      </div>
      <div className='rename_button_row'>
        <button className='rename_button_cancel' type='button' onClick={cancel}>
          {locale('cancel')}
        </button>
        <button
          className='rename_button_submit'
          type='button'
          onClick={onSubmit}
        >
          {locale('save')}
        </button>
      </div>
    </div>
  )
}
