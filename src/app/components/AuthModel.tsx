"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  Spinner,
  Alert,
} from "@heroui/react";
import { MailIcon } from "../../../public/icons/MailIcon";
import { LockIcon } from "../../../public/icons/LockIcon";
import { EyeIcon } from "../../../public/icons/EyeIcon";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  const { data, error, loading, setAuthState,loginStatus } = useAuthContext();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuth();
  const onSubmit =  (data: any) => {
    signin(data);
  };
  useEffect(()=>{
    if(loginStatus){
      
      router.push("/dashboard")
    }
  },[loginStatus])

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              Log in account
              {/* <p>Login user is :- {data?.fullName}</p> */}
              {error ? (
                <div className="flex items-center justify-center w-full">
                  <div className="flex flex-col w-full">
                  <Alert color="danger" title="Error: ">{error} </Alert>
                  </div>
                </div>
              ): (null)}
              
            </ModalHeader>

            <ModalBody>
              <div>
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email / Username"
                  placeholder="Enter your email / username"
                  variant="bordered"
                  isInvalid={!!errors.identifier}
                  errorMessage={
                    errors.identifier?.message
                      ? String(errors.identifier.message)
                      : ""
                  }
                  {...register("identifier", {
                    required: "Username or Email is required",

                    maxLength: {
                      value: 20,
                      message: "Max length is 20 characters",
                    },
                  })}
                />
              </div>

              {/* Password Input with Toggle */}
              <div>
                <Input
                  endContent={
                    password.length > 0 ? (
                      <EyeIcon
                        className="text-2xl text-default-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <LockIcon className="text-2xl text-default-400 pointer-events-none" />
                    )
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  variant="bordered"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message?.toString()}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                    validate: (value) =>
                      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/.test(value) ||
                      "Password must contain at least one uppercase letter and one number",
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex py-2 px-1 justify-between">
                <Checkbox classNames={{ label: "text-small" }}>
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit" isDisabled={loading}>
                {loading ? (
                  <>
                    Logging.. <Spinner size="sm" color="white" />
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
