'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import { User } from 'react-feather';
import { CldUploadButton } from 'next-cloudinary';
import { Button } from '@/components/buttons';

Modal.setAppElement('#modal');

export default function Settings() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle: any;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = '#000';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNameUpdate = async () => {
    setEditMode(!editMode);
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });
      const data = await res.json();
      router.refresh();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      signOut({
        callbackUrl: '/',
      });
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      return data;
    };

    getUser()
      .then(data => {
        setUsername(data.user.name);
        setImage(data.user.image);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    const postProfileImage = async () => {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      return data;
    };

    if (image) {
      postProfileImage()
        .then(data => {
          router.refresh();
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [image, router]);

  return (
    <section className="max-w-xl py-4">
      <h2 className="mb-6 text-2xl font-semibold">User Settings</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="text-md mt-6 block font-medium">
            Name
          </label>
          {editMode ? (
            <input
              id="username"
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={!editMode}
            />
          ) : (
            <p className="mt-1 w-full px-3 py-2">{username}</p>
          )}
        </div>
        <div className="flex">
          <Button
            intent={editMode ? 'secondary' : 'tertiary'}
            onClick={() => setEditMode(!editMode)}
            className="mr-4"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
          {editMode && (
            <Button intent="primary" onClick={handleNameUpdate}>
              Save
            </Button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-md mb-1 block font-medium">Profile picture</h3>
        <div className="flex flex-col items-start gap-4">
          {image ? (
            <Image
              src={image}
              alt="profile"
              width={96}
              height={96}
              className="rounded-md"
            />
          ) : (
            <User className="h-20 w-20 rounded-full" />
          )}

          <div className="rounded-full border-2 border-secondary px-6 py-2 text-lg font-medium text-secondary shadow-sm transition duration-200 ease-in-out hover:translate-y-0.5 hover:opacity-90 hover:shadow-md active:translate-y-0.5">
            <CldUploadButton
              uploadPreset="ketomarket_profile_pic"
              onUpload={(res: any) => {
                setImage(res.info.secure_url);
              }}
            >
              Upload new image
            </CldUploadButton>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-6 block border-t-4 border-tertiary pt-4 text-xl font-bold text-tertiary">
          Danger zone
        </h3>
        <Button intent="secondary" onClick={openModal}>
          Delete account
        </Button>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Delete account"
          className="absolute left-1/2 top-1/2 flex h-64 w-11/12 -translate-x-1/2 -translate-y-1/2 transform flex-col justify-around rounded-md bg-white p-6 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-semibold"
              ref={_subtitle => (subtitle = _subtitle)}
            >
              Delete account
            </h2>
            <Button intent="tertiary" onClick={closeModal} size="small">
              Close
            </Button>
          </div>
          <form className="mt-6" onSubmit={handleDeleteAccount}>
            <label
              htmlFor="delete-account"
              className="block text-center font-semibold"
            >
              Warning: this cannot be undone.
            </label>
            <Button
              id="delete-account"
              intent="secondary"
              className="m-auto mt-4 block w-11/12"
            >
              Delete account
            </Button>
          </form>
        </Modal>
      </div>
    </section>
  );
}
