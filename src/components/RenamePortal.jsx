import { useRenameContext } from '@/providers/RenameProvider'
import isTargetElement from '@/utils/isTargetElement'
import keys from '@/utils/keys'
import { useCallback, useEffect, useRef } from 'react'
import styles from './RenamePortal.module.css'

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
    <div className={styles.container}>
      <h4>名前の編集</h4>
      <div className={styles.input_row}>
        <label htmlFor='title'>名前</label>
        <input
          className={styles.input}
          ref={inputRef}
          defaultValue={oldTitle}
          name='title'
          id='title'
          label=''
          type='text'
        />
      </div>
      <div className={styles.button_row}>
        <button className={styles.button_cancel} type='button' onClick={cancel}>
          キャンセル
        </button>
        <button
          className={styles.button_submit}
          type='button'
          onClick={onSubmit}
        >
          保存
        </button>
      </div>
    </div>
  )
}
