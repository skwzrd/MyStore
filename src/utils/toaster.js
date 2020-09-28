import { toast } from 'react-toastify';
import { appStore } from '../components/stores/AppStore';
import { SUCCESS, FAIL } from './constants';

export const toaster = (result, msg) => {
  if(!appStore.notifications){
    return;
  }
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  
  if(result === SUCCESS){
    toast.success(msg, options);
  }
  else if(result === FAIL){
    toast.error(msg, options);
  }
  else{
    toast.info(msg, options);
  }
}
